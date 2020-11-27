# pomodoro-timer

A JavaScript based project on implementation of Pomodoro Technique.

Project is divided into two subprojects.

1. Pomodoro countdown timer.

2. Task list.

Although both subprojects are highly interdependent.

Each Task is a object of Todo class which contains id, title, content, createdAt, completed and has timeElapsed. TimeElapsed is controlled by a TodoTimer class which has timer functionalities and is extended by Todo class.

After task is added, select drop down is updated with list of all task. User has to select the task from drop down which will be marked as active task.

## Start Timer and Pomodoro Cycle

Upon start that specific task will be marked active and will be considered as currently pursued task by the user. Pomodoro countdown will begin from worktime selected by user until it reaches 00. Task's timeElapsed timer will also begin.

Then user has to again begin Pomodoro timer where countdown will begin from breaktime.

## Pause Timer

User can pause anytime. Upon pause, task's timeElapsed timer will also get paused.

## Task Completion

User can mark current task complete upon which Pomodoro timer will get paused. User will be prompted to select new task or reset timer. Upon selection of new task, Pomodoro timer will resume from same value it had been paused upon.

## Timer Reset

User can reset timer, which will reset timer to countdown from original values again, though it won't clear active task.

## Project Future

1. Making project persistent using localstorage.

2. Adding delete button for task.

3. Add skip active task which will remove the task from active status and put it back to task list.

4. Since we store time info of each task, Time Statistics can be computed and calculated.

Project Hosted at https://abhay-tank.github.io/pomodoro-timer/
