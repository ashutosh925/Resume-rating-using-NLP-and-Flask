import * as React from 'react';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

class SampleBase extends React.PureComponent {

    rendereComplete() {
        /**custom render complete function */
    }

    componentDidMount() {
        setTimeout(() => {
            this.rendereComplete();
        });
    }

}

export default SampleBase;