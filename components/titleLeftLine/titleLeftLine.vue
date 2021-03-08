<template>
    <view 
    class="title-left-line" 
    :style="{
        borderBottom: gethasBorderBottom?`1px solid ${borderBottomColor}`:'',
        background: background,
        paddingLeft: paddingRow,
        paddingRight: paddingRow
    }">
        <view 
        class="left-line"
        :style="{
            background: leftLineColor,
            height: '50rpx'
        }"></view>
        <view 
        class="title-left-line-title"
        :style="{
            fontSize: '30rpx'
        }">{{title}}</view>
    </view>
</template>

<script>
export default {
    name: 'title-leftLine',
    props: {
        title: {
            type: String,
            default: ''
        },
        leftLineColor: {
            type: String,
            default: '#f1505c'
        },
        leftLineBackground: {
            type: String,
            default: '#EEEEEE'
        },
        hasBorderBottom: {
            type: [String, Boolean],
            default: true
        },
        borderBottomColor: {
            type: String,
            default: '#EEEEEE'
        },
        background: {
            type: String,
            default: ''
        },
        paddingRow: {
            type: [String, Number],
            default: '0px'
        }
    },
    computed: {
        gethasBorderBottom() {
            return String(this.hasBorderBottom) === 'true'
        },
    }
}
</script>

<style lang="scss" scoped>
    .title-left-line{
        width: 100%;
        padding-top: 8px;
        padding-bottom: 8px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        .left-line{
            width: 4px;
        }
        .title-left-line-title{
            margin-left: 12px;
            font-weight: bold;
            display: flex;
            flex-direction: row;
            align-items: center;
        }
    }
</style>