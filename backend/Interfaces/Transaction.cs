namespace prosjekt_uke.Interfaces;

/// <summary>
/// Interface whose implementers guarantee the bare minimum API surface for CRUD applications
/// </summary>
public interface Transaction<T, Id>
{
    bool Add(T data);

    // parametric ID to support either simple numeric indexing or GUID/uuid k->v mapping
    T Get(Id id);

    bool Update(Id id, T data);

    bool Remove(Id id);
}
