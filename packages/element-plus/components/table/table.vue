<template>
  <div :class="`${classPrefix}-table`">
    <div :class="`${classPrefix}-table__options`">
      <ElPopover
        :append-to-body="false"
        :popper-options="{
          positionFixed: true
        }"
        placement="bottom"
        trigger="click"
      >
        <div>
          <ElCheckbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </ElCheckbox>
          <ElCheckboxGroup
            v-model="checkedColumns"
            @change="handleChecked"
          >
            <ElCheckbox
              v-for="column in columnsList"
              :key="column.prop"
              :label="column.label"
            >
              {{ column.label }}
            </ElCheckbox>
          </ElCheckboxGroup>
        </div>
        <template #reference>
          <div>
            <ElIcon :class="`${classPrefix}-table__options__item`">
              <Setting />
            </ElIcon>
          </div>
        </template>
      </ElPopover>
    </div>

    <RenderElTable
      v-bind="$attrs"
      :columns-list="columnsList"
      :checked-columns="checkedColumns"
      @updateColumnsList="updateColumnsList"
    >
      <slot />
    </RenderElTable>
  </div>
</template>

<script setup lang="ts">
import { ElPopover, ElCheckbox, ElCheckboxGroup, ElIcon } from 'element-plus';
import RenderElTable from './render-el-table.vue';
import { Setting } from '@element-plus/icons-vue';
import { ref, onMounted, defineComponent, defineProps } from 'vue';
import { usePrefix } from 'press-hooks';

const { classPrefix } = usePrefix();

let staticOptions = [];

const props = defineProps({
  defaultColumns: {
    type: Array,
    default: () => ([]),
  },
});

const checkAll = ref(true);
const isIndeterminate = ref(false);
const checkedColumns = ref([]);
const columnsList = ref([]);

const handleCheckAllChange = (val) => {
  checkedColumns.value = val ? staticOptions : [];
  isIndeterminate.value = false;
};
const handleChecked = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === staticOptions.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < staticOptions.length;
};

const updateColumnsList = (newColumnsList) => {
  columnsList.value = newColumnsList;
  staticOptions = newColumnsList.map(_ => _.label);
  if (!checkedColumns.value.length) {
    checkedColumns.value = staticOptions;
  } else {
    checkedColumns.value = checkedColumns.value.filter(_ => staticOptions.includes(_));
  }
  handleChecked(checkedColumns.value);
};

onMounted(() => {
  if (props.defaultColumns.length) {
    checkedColumns.value = checkedColumns.value.filter(_ => props.defaultColumns.includes(_));
  }
});
defineComponent({
  name: 'VcTable',
});
</script>

<style lang="less">
  .mm-table {
    &__options {
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &__item {
        cursor: pointer;
        margin-right: 8px;
      }
    }
  }
</style>
