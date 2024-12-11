using System.Collections;
using System.Text.Json;
using prosjekt_uke.DTO;
using prosjekt_uke.Interfaces;
using prosjekt_uke.Models;

namespace prosjekt_uke.Context;

public class DataContext : Transaction<Family, Guid>, IEnumerable<Family>
{
    // EVALUATE: Evaluate storing within context as a KV mapping and seralizing back to list from Dictionary.Values
    private List<Family> Families;

    private readonly ILogger<DataContext> _logger;

    public DataContext(ILogger<DataContext> logger)
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
        Console.Error.WriteLine("Destructor hit");
        _logger.LogDebug("Destructor hit");
        SaveToDisk();
    }

    public List<Family> LoadFromDisk()
    {
        try
        {
            using (var stream = File.Open("./data.json", FileMode.Open))
            {
                _logger.LogInformation("Stream opened");
                var data = JsonSerializer.Deserialize<List<FamilyJson>>(stream);
                if (data is not null)
                {
                    // Is there a better way to do this? Yesn't
                    List<Family> families = [];
                    data.ForEach(
                        (f) =>
                        {
                            var fam = new Family(f);
                            families.Add(fam);
                        }
                    );
                    _logger.LogInformation("Data deserialized");
                    return families;
                }
                else
                {
                    throw new NotImplementedException(
                        "Implement logic route for failing to load data"
                    );
                }
            }
        }
        catch (Exception exc)
        {
            _logger.LogError(exc, "Unable to process data from ./data.json for an unknown reason");
            throw;
        }
        // try
        // {
        //     using (var stream = File.Open("./families.json", FileMode.Open))
        //     {
        //         var data = JsonSerializer.Deserialize<List<FamilyJson>>(stream);
        //         if (data is not null)
        //         {
        //             var familyList = new List<Family>();
        //             foreach (var item in data)
        //             {
        //                 var id = Guid.CreateVersion7();
        //                 familyList.Add(
        //                     new Family
        //                     {
        //                         Id = id,
        //                         Image = $"/image/family/{id}.jpg",
        //                         Name = item.Name,
        //                         Description = item.Description,
        //                         Preferences = item.Preferences,
        //                         Title = item.Title,
        //                     }
        //                 );
        //             }
        //             return familyList;
        //         }
        //         else
        //         {
        //             throw new Exception("Unable to process any data");
        //         }
        //     }
        // }
        // catch (Exception exc)
        // {
        //     _logger.LogError(exc, "Unable to process any data");
        //     throw;
        // }
    }

    public bool SaveToDisk()
    {
        try
        {
            using (var stream = File.OpenWrite("./data.json"))
            {
                JsonSerializer.Serialize(stream, Families);
                _logger.LogDebug("Successfully serialized data");
                return true;
            }
        }
        catch (Exception exc)
        {
            _logger.LogError(exc, "Unable to write data to disk");
        }
        return false;
    }

    public bool Add(Family data, out Guid id)
    {
        id = data.Id;
        bool alreadyExists = Families.Any(
            (existing) =>
            {
                return data.Id == existing.Id;
            }
        );
        if (alreadyExists)
        {
            return false;
        }
        else
        {
            Families.Add(data);
            SaveToDisk();
            return true;
        }
    }

    public bool Add(FamilyDTO data, out Guid id)
    {
        // TODO: Validation / constructor from DTO
        var family = new Family(data);
        return Add(family, out id);
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
        SaveToDisk();
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
        SaveToDisk();
        if (removedCount > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    public IEnumerator<Family> GetEnumerator()
    {
        return Families.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return Families.GetEnumerator();
    }
}
