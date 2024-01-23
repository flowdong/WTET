import { Injectable } from '@nestjs/common';
import {Cron, Interval} from '@nestjs/schedule';

@Injectable()
export class Job {
  @Interval(10000)
  handleInterval() {
    console.log('666');
  }
  @Cron('45 * * * * *')
  handleCron() {
    console.log('666')
  }
}
