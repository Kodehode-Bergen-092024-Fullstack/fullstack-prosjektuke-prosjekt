using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using prosjekt_uke.Context;
using prosjekt_uke.DTO;
using prosjekt_uke.Models;

[ApiController]
[Route("api")]
// TODO: DTO for ID-less objects such that validation and assigment is our concern
public class ApiController : ControllerBase
{
    private readonly DataContext _dataContext;
    private readonly ILogger<ApiController> _logger;

    /// <summary>
    /// Returns all registered family objects
    /// </summary>
    /// <returns>An array of Family objects wrapped inside an IActionResult</returns>
    /// <response code="200">Returns the located objects</response>
    [HttpGet("family/all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GetFamilies()
    {
        return Ok(_dataContext.AsEnumerable().ToList());
    }

    /// <summary>
    /// Get a registered family object by ID
    /// </summary>
    /// <param name="id"></param>
    /// <returns>A family object if it exists, otherwise not found</returns>
    /// <response code="200">Returns the located object</response>
    /// <response code="400">If the object is not registered</response>
    [HttpGet("family/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult GetFamily(Guid id)
    {
        _logger.LogInformation("Family ID: {id}", id);
        var family = _dataContext.Get(id);

        if (family is not null)
        {
            return Ok(family);
        }
        else
        {
            return BadRequest(new { Id = id });
        }
    }

    /// <summary>
    /// Registers a new family object
    /// </summary>
    /// <param name="family"></param>
    /// <returns>The newly registered object</returns>
    /// <response code="200">Returns the created object</response>
    /// <response code="400">If the object could not be registered due to conflicts</response>
    [HttpPost("family")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult CreateFamily([FromBody] FamilyDTO familyDTO)
    {
        _logger.LogInformation("Family DTO: {@familyDTO}", familyDTO);
        bool added = _dataContext.Add(familyDTO, out var id);
        if (added)
        {
            return Ok(new { id });
        }
        else
        {
            return BadRequest();
        }
    }

    /// <summary>
    /// Deletes a registered family object
    /// </summary>
    /// <param name="id"></param>
    /// <returns>Success status</returns>
    /// <response code="200">The object has been deleted</response>
    /// <response code="400">The object was not deleted</response>
    [HttpDelete("family/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult DeleteFamily(Guid id)
    {
        _logger.LogInformation("Family ID: {id}", id);
        bool deleted = _dataContext.Remove(id);
        if (deleted)
        {
            return Ok();
        }
        else
        {
            return BadRequest(new { DoesNotExist = id });
        }
    }

    /// <summary>
    /// Replaces a registered family object
    /// </summary>
    /// <param name="id">Must exist</param>
    /// <param name="family">Cannot be a partial object</param>
    /// <returns>Success status</returns>
    /// <response code="200">The object has been replaced</response>
    /// <response code="400">The object could not be replaced</response>
    [HttpPut("family/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult ReplaceFamily(Guid id, [FromBody] Family family)
    {
        _logger.LogInformation("Family: {@family}", family);
        var replaced = _dataContext.Update(id, family);
        if (replaced)
        {
            return NoContent();
        }
        else
        {
            return BadRequest(new { ValueNotReplaced = id });
        }
        throw new NotImplementedException();
    }

    public ApiController(DataContext dataContext, ILogger<ApiController> logger)
    {
        _dataContext = dataContext;
        _logger = logger;
    }
}
