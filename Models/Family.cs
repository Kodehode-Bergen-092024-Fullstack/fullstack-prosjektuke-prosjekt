using System.Text.Json.Serialization;

namespace prosjekt_uke.Models;

public class Family
{
    [JsonPropertyName("id")]
    public required int Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("familySize")]
    public required int FamilySize { get; set; }

    [JsonPropertyName("description")]
    public required string Description { get; set; }

    [JsonPropertyName("diet")]
    public required string[] Diet { get; set; }

    [JsonPropertyName("habits")]
    public required string[] Habits { get; set; }

    [JsonPropertyName("hasPets")]
    public required bool HasPets { get; set; }

    [JsonPropertyName("allergies")]
    public required string[] Allergies { get; set; }

    [JsonPropertyName("childrenAgeGroups")]
    public required string[] ChildrenAgeGroups { get; set; }

    [JsonPropertyName("image")]
    public required string ImageUrl { get; set; }
}