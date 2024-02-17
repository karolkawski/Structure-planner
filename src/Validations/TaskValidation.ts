import * as yup from 'yup';

export const taskSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  priority: yup.string().required(),
  color: yup.string().required(),
  icon: yup.string().required(),
  category: yup.string().required(),
  endTime: yup.string().required(),
  startTime: yup.string().required(),
  name: yup.string().required(),
});
