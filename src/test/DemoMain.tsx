import React, {Component} from 'react';
import Radio from "../lib/lc-radio/Radio";
import {merge} from "lodash";

class DemoMain extends Component {



    render() {
        let level1 = {
            stringProp: "hello",
            numberProp: 123,
            booleanProp: true,
            nullProp: null,
            undefinedProp: undefined,
            objectProp: {name: "John", age: 30},
            arrayProp: [1, 2, 3],
            level2: {
                test: "test",
                level3: {
                    sssd: "ssss"
                }
            }
        }

        let a = {level1: {object: {nestedObject: {deepString: 'xxxxxx'}}}}
        return (
            <Radio options={[
                {value: 'start', label: '前'},
                {value: 'center', label: '中'},
                {value: 'end', label: '后'}]} defaultValue={'center'}/>
        );
    }
}

export default DemoMain;