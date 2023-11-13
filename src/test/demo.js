export default class Component {
    /**
     * @description 组件挂载到dom中
     * */
    async mount(style) {

    }

    /**
     * @description 更新组件样式
     * @param {Object} style 组件样式
     * */
    setStyle(style) {

    }

    /**
     * @description 更新组件数据
     * @param {[Object]} data 映射后的数据
     * */
    setData(data) {

    }


    /**
     * @description 调整组件大小
     * */
    resize() {

    }

    /**
     * @description 根据情况决定组件销毁前操作
     * */
    destroy() {

    }

    /**
     * @description 添加子组件,在新建子组件以及初始化时都会触发
     * @param {{
     * id:String,
     * name:String,
     * type:String,
     * visible:Boolean,
     * style:Object,
     * data:Array
     * }} child
     * @param {Number} index 子组件位置
     * */
    addChild(child, index) {

    }

    /**
     * @description 移除子组件
     * @param {String} childId
     * */
    removeChild(childId) {

    }

    /**
     * @description 修改子组件样式
     * @param {String} id
     * @param {Object} style
     * */
    setChildStyle(id, style) {

    }

    /**
     * @description 修改子组件数据
     * @param {String} id
     * @param {Array} data
     * */
    setChildData(id, data) {

    }

    /**
     * @description 子组件是否可见
     * @param {String} id
     * @param {Boolean} visible
     * */
    setChildVisible(id, visible) {

    }

    /**
     * @description 子组件排序
     * @param {[String]} childIds
     * */
    sortChildren(childIds) {

    }

}