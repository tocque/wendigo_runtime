import { viewManager } from '@/view/view';
import Loading from './Index.vue';

export const showLoading = async function() {
    await viewManager.push(Loading);
}
