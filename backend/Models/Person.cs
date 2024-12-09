using System.Text.Json.Serialization;

public class Person
{
    [JsonPropertyName("name")]
    public required string Name;

    [JsonPropertyName("surname")]
    public required string Surname;
}
