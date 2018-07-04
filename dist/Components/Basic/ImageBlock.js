import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { ImageUtils } from '../../Shared/Utils';
import { FlexBox } from './FlexBox';
export class ImageBlock extends React.Component {
    constructor(props) {
        super(props);
        this.renderPlaceholder = () => {
            if (!this.state.loaded) {
                return (React.createElement(View, { style: [
                        {
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    ] },
                    React.createElement(Text, { style: {
                            fontSize: 32,
                            color: 'rgba(0, 0, 0, 0.5)',
                            textAlign: 'center'
                        } }, '\uE601')));
            }
            return undefined;
        };
        this.fetchImageSize = () => {
            ImageUtils.fetchSize(this.props.url, this.onImageSize, this.onImageSizeError);
        };
        this.onLayoutChange = (width, height) => {
            this.fetchImageSize();
        };
        this.onImageSizeUpdate = (event) => {
            let width = event.nativeEvent.layout.width;
            let height = event.nativeEvent.layout.height;
            if (this.props.onImageSize) {
                this.props.onImageSize(width, height);
            }
        };
        this.onImageSize = (width, height) => {
            let size = ImageUtils.calcSize({ width: width, height: height }, { width: this.props.containerWidth, height: this.props.containerHeight }, this.props.width, this.props.fitAxis);
            this.setState(size);
        };
        this.onImageSizeError = () => {
            this.setState({
                loaded: false
            });
        };
        this.onImageLoad = () => {
            this.setState({
                loaded: true
            });
            this.fetchImageSize();
        };
        this.onImageError = () => {
            this.setState({
                loaded: false
            });
        };
        this.state = {
            loaded: true,
            width: undefined,
            height: undefined,
        };
    }
    render() {
        return (React.createElement(FlexBox, Object.assign({}, this.props, { style: [
                this.props.boxStyle,
                {
                    alignSelf: this.props.alignSelf,
                }
            ], onLayoutChange: this.onLayoutChange, onPress: this.props.onPress, width: 'auto' }),
            this.renderPlaceholder(),
            React.createElement(Image, { accessible: !!this.props.alt, accessibilityLabel: this.props.alt, source: { uri: this.props.url }, style: [
                    this.getSize(),
                    this.props.imgStyle
                ], onLoad: this.onImageLoad, onError: this.onImageError, onLayout: this.onImageSizeUpdate })));
    }
    getSize() {
        return ImageUtils.fitSize(this.state, { width: this.props.maxWidth, height: this.props.maxHeight }, { width: this.props.maxWidth, height: this.props.maxHeight }, this.props.fitAxis);
    }
}