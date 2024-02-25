import * as yup from 'yup';
import { isTimeInRange } from '../utils/Date';

export const taskSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  priority: yup.string().required(),
  color: yup.string().required(),
  icon: yup.string().required(),
  category: yup.string().required(),
  endTime: yup
    .string()
    .required('End time is required')
    .test('end-time', 'End time cannot be before start time', function (value) {
      const startTime = this.parent.startTime;
      const currentHours = this.parent.currentHours;
      if (currentHours && currentHours[1] === value) {
        return true;
      }
      return !startTime || value > startTime;
    })
    .test(
      'end-time-range',
      'End time is in the blocked range',
      function (value) {
        const blockedHours = this.parent.blockedHours;
        const currentHours = this.parent.currentHours;
        if (currentHours && currentHours[1] === value) {
          return true;
        }
        return blockedHours.length > 0
          ? !blockedHours.some((range: string[]) => isTimeInRange(value, range))
          : true;
      }
    ),
  startTime: yup
    .string()
    .required('Start time is required')
    .test('start-time', 'End time must be after start time', function (value) {
      const endTime = this.parent.endTime;
      const currentHours = this.parent.currentHours;
      if (currentHours && currentHours[0] === value) {
        return true;
      }
      return !endTime || value < endTime;
    })
    .test(
      'start-time-range',
      'Start time is in the blocked range',
      function (value) {
        const blockedHours = this.parent.blockedHours;
        const currentHours = this.parent.currentHours;
        if (currentHours && currentHours[0] === value) {
          return true;
        }
        return blockedHours.length > 0
          ? !blockedHours.some((range: string[]) => isTimeInRange(value, range))
          : true;
      }
    ),
  name: yup.string().required(),
});
