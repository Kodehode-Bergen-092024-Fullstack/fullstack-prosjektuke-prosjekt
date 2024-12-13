using System.Text.Json.Serialization;
using prosjekt_uke.DTO;
using Serilog;

namespace prosjekt_uke.Models;

public class Family
{
    public Guid Id { get; set; } = Guid.CreateVersion7();

    public string Name { get; set; }

    public int CelebrateSize { get; set; }

    public string Description { get; set; }

    public string[] Diet { get; set; }

    public string[] Habits { get; set; }

    public bool HasPets { get; set; }

    public string[] Allergies { get; set; }

    public string[] ChildrenAgeGroups { get; set; }

    public string Image { get; set; }

    public Family(FamilyJson f)
    {
        if (Guid.TryParse(f.Id, out var id))
        {
            Id = id;
        }
        else
        {
            Log.Logger.Warning("Unable to transform {f.Id} to GUID", f.Id);
            Id = Guid.CreateVersion7();
        }
        Name = f.Name;
        CelebrateSize = f.CelebrateSize;
        Description = f.Description;
        Diet = f.Diet;
        Habits = f.Habits;
        HasPets = f.HasPets;
        Allergies = f.Allergies;
        ChildrenAgeGroups = f.ChildrenAgeGroups;
        try
        {
            var from = $"./wwwroot/image/familie/family{f.Id}.jpg";
            var to = $"./wwwroot/image/familie/family_{Id}.jpg";
            Log.Logger.Debug("Attempting to move {from} to {to}", from, to);
            File.Move(from, to);
        }
        catch (Exception exc)
        {
            Log.Logger.Warning("Could not move pre_existing file {@exc}", exc);
        }
        Image = $"./image/familie/family_{Id}.jpg";
    }

    public Family(FamilyDTO f)
    {
        Id = Guid.CreateVersion7();
        Name = f.Name;
        CelebrateSize = f.FamilySize;
        Description = f.Description;
        Diet = f.Diet;
        Habits = f.Habits;
        HasPets = f.HasPets;
        Allergies = f.Allergies;
        ChildrenAgeGroups = f.ChildrenAgeGroups;
        Image = f.Image;
    }
}
