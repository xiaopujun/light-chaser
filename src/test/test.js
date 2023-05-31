function replaceObjectProps(originalData, newData) {
    console.log('demo')
    // 遍历新数据对象
    Object.keys(newData).forEach(key => {
        const newValue = newData[key];
        // 如果原数据中存在该属性，且新值是一个对象，则递归调用 replaceObjectProps 函数
        if (originalData.hasOwnProperty(key) && typeof newValue === "object" && newValue !== null) {
            replaceObjectProps(originalData[key], newValue);
        } else {
            // 否则，直接用新值替换原值
            originalData[key] = newValue;
        }
    });
    return originalData;
}

let res = replaceObjectProps({
    level1: {
        string: "Hello",
        nullValue: null,
        array: ["apple", 2, false, {nested: "value"}],
        object: {
            nestedString: "World",
            nestedArray: [1, "two", true],
            nestedObject: {
                deepString: "OpenAI",
                deepNull: null,
                deepArray: [{item: "one"}, 2, false],
                deepObject: {
                    extraString: "AI Assistant",
                    extraArray: [3, "four", true],
                    extraObject: {
                        finalString: "Done",
                        finalArray: [5, "six", false],
                    },
                },
            },
        },
        stu: {
            name: 'zhangsan',
            city: {
                code: 23,
                name: 'beijing'
            }
        }
    },
}, {
    level1: {
        object: {
            nestedObject: {
                deepString: 'xxxxxx'
            }
        },
        stu: {
            city: {
                code: 100000
            }
        }
    }
})