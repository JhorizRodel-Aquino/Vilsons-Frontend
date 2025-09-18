export type Status = 'pending' | 'ongoing' | 'completed' | 'for release';

export const statusItems: Record<Status, {
  label: string,
  desc: string,
  color: string,
  iconFilename: string
}> = {
  pending: {
    label: 'Pending',
    desc: 'Awaiting contractor assignment',
    color: 'red',
    iconFilename: 'wait'
  },
  ongoing: {
    label: 'Ongoing',
    desc: 'Currently in progress',
    color: 'yellow',
    iconFilename: 'wrench'
  },
  completed: {
    label: 'Completed',
    desc: 'Awaiting assessment',
    color: 'green',
    iconFilename: 'check'
  },
  'for release': {
    label: 'For Release',
    desc: 'Ready for customer pickup',
    color: 'blue',
    iconFilename: 'truck'
  }
};
