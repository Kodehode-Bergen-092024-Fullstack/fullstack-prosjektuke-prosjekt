using Microsoft.AspNetCore.Mvc;
using prosjekt_uke.Context;
using prosjekt_uke.Models;

[ApiController]
[Route("api")]
public class ApiController : ControllerBase
{
    private readonly DataContext _dataContext;
    private readonly ILogger<ApiController> _logger;

    [HttpGet("family/all")]
    public IActionResult GetFamilies()
    {
        _logger.LogInformation("");
        return Ok(new { Families = _dataContext.AsEnumerable().ToList() });
    }

    [HttpGet("family/{id}")]
    public IActionResult GetFamily(int id)
    {
        var family = _dataContext.Get(id);

        if (family is not null)
        {
            return Ok(family);
        }
        else
        {
            return NotFound(new { Id = id });
        }
    }

    [HttpPost("family")]
    public IActionResult CreateFamily([FromBody] Family family)
    {
        bool added = _dataContext.Add(family);
        if (added)
        {
            return Ok(new { family.Id });
        }
        else
        {
            return BadRequest();
        }
    }

    [HttpDelete("family/{id}")]
    public IActionResult DeleteFamily(int id)
    {
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

    [HttpPut("family/{id}")]
    public IActionResult ReplaceFamily(int id, [FromBody] Family family)
    {
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
