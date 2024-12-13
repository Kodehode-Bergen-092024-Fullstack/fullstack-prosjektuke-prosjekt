namespace prosjekt_uke.DTO;

public class FamilyDTO
{
    public required string Name { get; set; }

    public required int FamilySize { get; set; }

    public required string Description { get; set; }

    public required string[] Diet { get; set; }

    public required string[] Habits { get; set; }

    public required bool HasPets { get; set; }

    public required string[] Allergies { get; set; }

    public required string[] ChildrenAgeGroups { get; set; }

    public required string[] Pet { get; set; }

    public required string Image { get; set; }
}
