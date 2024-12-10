namespace prosjekt_uke.Interfaces;

/// <summary>
/// Interface whose implementers guarantee the bare minimum API surface for CRUD applications
/// </summary>
public interface Transaction<T, Id>
{
    /// <summary>
    /// Add new data to the backing storage
    /// </summary>
    /// <exception cref="ArgumentException">Thrown if data with ID already exists</exception>
    /// <param name="data">Data which contains an id of Id</param>
    /// <returns>true if successful, false if not</returns>
    bool Add(T data);

    // parametric ID to support either simple numeric indexing or GUID/uuid k->v mapping
    /// <summary>
    /// Retreive data from backing storage
    /// </summary>
    /// <param name="id">Unique identifier by which to identify T data</param>
    /// <returns>T if T exists in storage, otherwise null</returns>
    T? Get(Id id);

    /// <summary>
    /// Update data in backing storage
    /// </summary>
    /// <param name="id">Unique identifier by which to identify T data</param>
    /// <param name="data">Data which contains an id of Id</param>
    /// <returns>true if data with id Id was updated, false if not</returns>
    bool Update(Id id, T data);

    /// <summary>
    /// Delete data from backing storage
    /// </summary>
    /// <param name="id">Unique identifier by which to identify T data</param>
    /// <returns>true if successfully deleted, false if not</returns>
    bool Remove(Id id);
}
