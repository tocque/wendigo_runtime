import { viewManager } from '@/view/view';
import Title from './Index.vue';

export const showTitle = async function() {
    await viewManager.push(Title);
}
