import { ORDER } from './constants';

const dictionary = ORDER.status;

export default function translateStatus(status: string) {
  switch (status) {
    case 'done':
      return dictionary.done;
    case 'pending':
      return dictionary.pending;
    case 'created':
      return dictionary.created;
    case 'canceled':
      return dictionary.canceled;
    default:
      return 'error: unknown status';
  }
}
