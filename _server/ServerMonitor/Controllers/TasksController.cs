﻿using Microsoft.Win32.TaskScheduler;
using System;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using ServerMonitor.Helpers;
using ServerMonitor.Models;

namespace ServerMonitor.Controllers
{
    public class TasksController : ApiController
    {

        [HttpGet]
        public object Get()
        {
            try
            {
                var tasks = ConfigurationManager.AppSettings["ScheduledTasksToView"];
                var taskDetails = TaskService.Instance.AllTasks.Where(t => tasks.Contains(t.Name));
                var details = taskDetails.Select(t => new
                {
                    t.Name,
                    State = t.State.ToString(),
                    t.Path,
                    LastRunTime = t.LastRunTime.ToString("g"),
                    t.LastTaskResult
                });
                return details;
            }
            catch (Exception ex)
            {
                return new {ex.Message, Exception = ex.StackTrace};
            }
        }

        [HttpPost]
        public Response Post([FromBody] string name)
        {
            var response = new Response {Status = Status.Success};
            try
            {
                var task = TaskService.Instance.GetTask(name);
                if (task == null)
                {
                    response.Status = Status.Error;
                    response.AddErrorNotification("There is no task with given name");
                    return response;
                }

                string message;
                if (task.State == TaskState.Running)
                {
                    task.Stop();
                    message = "stopped";
                }
                else
                {
                    task.Run();
                    message = "started";
                }

                response.AddSuccessNotification($"Task {message} successfuly");
                return response;
            }
            catch (Exception ex)
            {
                response.Status = Status.Error;
                response.AddErrorNotification(ex.Message, ex.StackTrace);
                return response;
            }
        }
    }
}