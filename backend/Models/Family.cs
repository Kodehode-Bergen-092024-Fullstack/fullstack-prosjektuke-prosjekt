using System.Text.Json.Serialization;

namespace prosjekt_uke.Models;

public class Family
{
    [JsonPropertyName("id")]
    public required Guid Id { get; set; }

    [JsonPropertyName("image")]
    public required byte[] Image { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("title")]
    public required string Title { get; set; }

    [JsonPropertyName("description")]
    public required string Description { get; set; }

    [JsonPropertyName("preferences")]
    public required string[] Preferences { get; set; }

    [JsonPropertyName("members")]
    public required Person[] Members { get; set; }
}
