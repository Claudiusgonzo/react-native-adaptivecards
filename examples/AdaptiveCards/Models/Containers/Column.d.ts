import { CardContext } from '../../Contexts/CardContext';
import { AbstractModel } from '../Abstract/AbstractModel';
import { ContentModel } from '../Abstract/ContentModel';
import { ScopeModel } from '../Abstract/ScopeModel';
import { BackgroundImageModel } from '../CardElements/BackgroundImage';
export declare class ColumnModel extends ScopeModel {
    items: ContentModel[];
    width: 'auto' | 'stretch' | number;
    height: 'auto' | 'stretch';
    verticalContentAlignment: 'top' | 'center' | 'bottom';
    style: 'default' | 'emphasis';
    backgroundImage: BackgroundImageModel;
    constructor(json: any, parent: AbstractModel, context: CardContext);
    readonly children: AbstractModel[];
}
