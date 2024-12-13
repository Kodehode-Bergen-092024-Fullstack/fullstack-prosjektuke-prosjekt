using System.Text.Json.Serialization;

namespace prosjekt_uke.Models;

public class FamilyJson
{
    [JsonPropertyName("Id")]
    public required string Id { get; set; }

    [JsonPropertyName("Name")]
    public required string Name { get; set; }

    [JsonPropertyName("CelebrateSize")]
    public required int CelebrateSize { get; set; }

    [JsonPropertyName("Description")]
    public required string Description { get; set; }

    [JsonPropertyName("Diet")]
    public required string[] Diet { get; set; }

    [JsonPropertyName("Habits")]
    public required string[] Habits { get; set; }

    [JsonPropertyName("HasPets")]
    public required bool HasPets { get; set; }

    [JsonPropertyName("Allergies")]
    public required string[] Allergies { get; set; }

    [JsonPropertyName("ChildrenAgeGroups")]
    public required string[] ChildrenAgeGroups { get; set; }

    [JsonPropertyName("Pet")]
    public required string[] Pet { get; set; }

    [JsonPropertyName("Image")]
    public required string ImageUrl { get; set; }
}
