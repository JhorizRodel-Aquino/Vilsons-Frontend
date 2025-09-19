export type Status = 'pending' | 'ongoing' | 'completed' | 'for release';

export const statusItems: Record<Status, {
  label: string,
  desc: string,
  color: string,
  iconName: string
}> = {
  pending: {
    label: 'Pending',
    desc: 'Awaiting contractor assignment',
    color: 'red',
    iconName: 'wait'
  },
  ongoing: {
    label: 'Ongoing',
    desc: 'Currently in progress',
    color: 'yellow',
    iconName: 'wrench'
  },
  completed: {
    label: 'Completed',
    desc: 'Awaiting assessment',
    color: 'green',
    iconName: 'check'
  },
  'for release': {
    label: 'For Release',
    desc: 'Ready for customer pickup',
    color: 'blue',
    iconName: 'truck'
  }
};
