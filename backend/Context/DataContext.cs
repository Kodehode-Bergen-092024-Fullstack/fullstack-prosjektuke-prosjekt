using System.Text.Json;
using prosjekt_uke.Interfaces;
using prosjekt_uke.Models;

namespace prosjekt_uke.Context;

public class DataContext : Transaction<Family, Guid>
{
    // EVALUATE: Evaluate storing within context as a KV mapping and seralizing back to list from Dictionary.Values
    private List<Family> Families;

    private readonly ILogger _logger;

    public DataContext(ILogger logger)
    {
        _logger = logger;
        Families = LoadFromDisk();
    }

    /*
        NOTE: a little lifecycle / syntactic trick for those unfamiliar
        this is known as a destructor (sometimes finaliser [we are bad at naming things])
        it is called when the object is "destroyed" (de-allocated) and can serve as a
        convenient location to perform resource clean-up, or in our case, guarantee that
        state is persisted to disk.

        One thing to take great care of, this function should never throw
        or cause an exception to be thrown during its execution
    */
    ~DataContext()
    {
        SaveToDisk();
    }

    public List<Family> LoadFromDisk()
    {
        try
        {
            using (var stream = File.Open("./data.json", FileMode.Open))
            {
                var data = JsonSerializer.Deserialize<List<Family>>(stream);
                if (data is not null)
                {
                    return data;
                }
            }
        }
        catch (Exception exc)
        {
            _logger.LogError(exc, "Unable to process data from ./data.json for an unknown reason");
        }
        try
        {
            using (var stream = File.Open("./families.json", FileMode.Open))
            {
                var data = JsonSerializer.Deserialize<List<FamilyJson>>(stream);
                if (data is not null)
                {
                    var familyList = new List<Family>();
                    foreach (var item in data)
                    {
                        var id = Guid.CreateVersion7();
                        familyList.Add(
                            new Family
                            {
                                Id = id,
                                Image = $"/image/family/{id}.jpg",
                                Name = item.Name,
                                Description = item.Description,
                                Preferences = item.Preferences,
                                Title = item.Title,
                            }
                        );
                    }
                    return familyList;
                }
                else
                {
                    throw new Exception("Unable to process any data");
                }
            }
        }
        catch (Exception exc)
        {
            _logger.LogError(exc, "Unable to process any data");
            throw;
        }
    }

    public bool SaveToDisk()
    {
        try
        {
            using (var stream = new StreamWriter(File.OpenWrite("./data.json")))
            {
                stream.Write(JsonSerializer.Serialize(Families));
                return true;
            }
        }
        catch (Exception exc)
        {
            _logger.LogError(exc, "Unable to write data to disk");
        }
        return false;
    }

    public bool Add(Family data)
    {
        bool alreadyExists = Families.Any(
            (existing) =>
            {
                return data.Id == existing.Id;
            }
        );
        if (alreadyExists)
        {
            throw new ArgumentException($"Familiy with {data.Id} already exists");
        }
        else
        {
            Families.Add(data);
            return true;
        }
    }

    public Family? Get(Guid id)
    {
        var family = (from _family in Families where _family.Id == id select _family).First();
        return family;
    }

    public bool Update(Guid id, Family data)
    {
        var index = Families.FindIndex(
            (value) =>
            {
                return value.Id == id;
            }
        );
        Families[index] = data;
        return true;
    }

    public bool Remove(Guid id)
    {
        var removedCount = Families.RemoveAll(
            (value) =>
            {
                return value.Id == id;
            }
        );
        if (removedCount > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
