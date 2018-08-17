import * as React from 'react';

import { DatePickerAndroid, DatePickerIOS, Platform } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';
import { TimeUtils } from '../../Utils/TimeUtils';
import { ButtonGroup } from '../Containers/ButtonGroup';
import { Card } from '../Containers/Card';
import { ModalBox } from '../Containers/ModalBox';
import { Button } from './Button';

interface IProps {
    value: string;
    show: boolean;
    onValueChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export class DatePanel extends React.Component<IProps> {
    public componentDidUpdate() {
        if (Platform.OS === 'android' && this.props.show) {
            this.showPickerAndroid();
        }
    }

    public render() {
        if (Platform.OS === 'ios') {
            return (
                <ModalBox
                    show={this.show}
                >
                    <Card
                        flex={0}
                        fit='content'
                    >
                        <DatePickerIOS
                            date={TimeUtils.extractDate(this.props.value)}
                            mode='date'
                            onDateChange={this.onDateChange}
                        />
                        <ButtonGroup>
                            {this.renderCancelButton()}
                            {this.renderSaveButton()}
                        </ButtonGroup>
                    </Card>
                </ModalBox>
            );
        }
        return null;
    }

    private renderCancelButton() {
        return (
            <Button
                flex={1}
                title='Cancel'
                color={StyleManager.getColor('accent', 'default', false)}
                fontSize={StyleManager.getFontSize('default')}
                fontWeight={StyleManager.getFontWeight('bolder')}
                backgroundColor={StyleManager.getBackgroundColor('default')}
                textHorizontalAlign='center'
                textVerticalAlign='center'
                paddingTop={6}
                paddingBottom={6}
                paddingLeft={16}
                paddingRight={16}
                onPress={this.onCancel}
            />
        );
    }

    private renderSaveButton() {
        return (
            <Button
                flex={1}
                title='Save'
                color={StyleManager.getColor('accent', 'default', false)}
                fontSize={StyleManager.getFontSize('default')}
                fontWeight={StyleManager.getFontWeight('bolder')}
                backgroundColor={StyleManager.getBackgroundColor('default')}
                textHorizontalAlign='center'
                textVerticalAlign='center'
                paddingTop={6}
                paddingBottom={6}
                paddingLeft={16}
                paddingRight={16}
                onPress={this.onSave}
                style={{
                    borderLeftWidth: 1,
                    borderLeftColor: StyleManager.separatorColor,
                }}
            />
        );
    }

    private async showPickerAndroid() {
        if (Platform.OS === 'android') {
            const today = new Date();
            try {
                const { action, year, month, day } = await DatePickerAndroid.open({
                    date: today,
                });
                if (action === DatePickerAndroid.dateSetAction) {
                    let newDate = new Date(year, month, day);
                    this.onDateChange(newDate);
                    this.onSave();
                }
                if (action === DatePickerAndroid.dismissedAction) {
                    this.setState({
                        showDatePicker: false
                    }, this.onCancel);
                }
            } catch ({ code, message }) {
                console.warn('Cannot open date picker', message);
            }
        }
    }

    private onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    private onSave = () => {
        if (this.props.onSave) {
            this.props.onSave();
        }
    }

    private onDateChange = (date: Date) => {
        if (this.props.onValueChange) {
            this.props.onValueChange(TimeUtils.getDateString(date));
        }
    }

    private get show() {
        return this.props.show && Platform.OS === 'ios';
    }
}
