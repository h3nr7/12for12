import * as schedule from 'node-schedule';

import * as events from 'events';

/**
 * HOW TO USE SCHEDULER
 * 
 * -- Initialize --
 * const scheduler = new Scheduler();
 * -- listen to added and removed events --
 * scheduler.on(Scheduler.ADDED, (event) => { console.log('added something', event) });
 * scheduler.on(Scheduler.REMOVED, (event) => {console.log('removed something', event)});
 * 
 * -- add a job --
 * scheduler.add(1, BASE_SCHEDULE_TIME, () => {
 * 	console.log(`new Base Schedule started for every pattern ${BASE_SCHEDULE_TIME}`);
 * });
 * 
 * -- remove a job --
 * const server = app.listen(PORT, err => {
 * 	if(err) return console.error(err);
 * 	return console.log(`server is listeneing on ${PORT}`);
 * });
 */

/** interface for scheduler job */
export interface SchedulerJob extends schedule.Job { }

/** interface for scheulder jobs  */
export interface SchedulerJobs  {
    [key: number]: SchedulerJob
}

/** class for scheduler holding all the schedules */
export default class Scheduler extends events.EventEmitter {
    static ADDED = 'Scheduler.ADDED';
    static REMOVED = 'Scheduler.REMOVED';
    tasks: SchedulerJobs = {};

    add (
        key: number, 
        rule: schedule.RecurrenceRule | schedule.RecurrenceSpecDateRange | schedule.RecurrenceSpecObjLit | Date | string | number,
        func: schedule.JobCallback
    ): void {
        this.tasks[key] = schedule.scheduleJob(rule, func);
        this.emit(Scheduler.ADDED, { 
            id: key,
            [key]: this.tasks[key] 
        });
    }

    remove(key:number): void {
        try {
            this.tasks[key].cancel();
            delete this.tasks[key];
            this.emit(Scheduler.REMOVED, { id: [key] });
        } catch(e) {
            console.log(`Tasks does not exist`);
        }
    }
}