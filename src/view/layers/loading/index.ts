import { viewManager } from '@/view/view';
import Loading from './Index.vue';

export const showLoading = function() {
    viewManager.push(Loading);
}