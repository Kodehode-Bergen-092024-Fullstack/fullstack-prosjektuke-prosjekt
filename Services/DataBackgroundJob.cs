using System.Timers;
using prosjekt_uke.Context;

namespace prosjekt_uke.Services;

public class DataBackgroundJob : IBackgroundJob
{
    public readonly DataContext _dataContext;
    public readonly ILogger<DataBackgroundJob> _logger;

    public async Task ActionToDoAsync(CancellationToken cancellationToken = default)
    {
        try
        {
            _logger.LogInformation("Attempting to re-serialize data to disk");
            _dataContext.SaveToDisk();
        }
        catch (Exception exc)
        {
            _logger.LogWarning("Unable to re-serialize data in background, {@exc}", exc);
        }
        await Task.Delay(1000 * 60, cancellationToken);
    }

    public Task OnException(Exception exception)
    {
        throw new NotImplementedException();
    }

    public DataBackgroundJob(DataContext dataContext, ILogger<DataBackgroundJob> logger)
    {
        _dataContext = dataContext;
        _logger = logger;
    }
}
