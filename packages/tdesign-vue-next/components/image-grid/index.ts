import { withInstall } from '../../utils';

import _ImageGrid from './image-grid.vue';
import './styles/index.scss';

export const ImageGrid = withInstall(_ImageGrid);

export default ImageGrid;

export * from './types';
