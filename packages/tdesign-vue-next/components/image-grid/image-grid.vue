<template>
  <div
    class="press-image-grid
    grid
    w-full
    grid-cols-[repeat(auto-fill,160px)]
    justify-around
    justify-items-center
    gap-x-10
    gap-y-10
    "
    :style="`grid-template-columns: repeat(auto-fill,${width})`"
  >
    <div
      v-for="(item, index) of imageList"
      :key="index"
      class="
      m-[10px]
      h-[160px]
      w-[160px]
      rounded-[2px]
      border-[4px]
      border-solid
      border-[#f3f3f3]
      "
      :style="`width: ${width};height: ${height}`"
    >
      <TImageViewer
        v-model:index="previewIndex"
        :images="previewImgs"
        :title="`${imageList[previewIndex].name} `"
      >
        <template #trigger="{ open }">
          <div
            class="press-image
            relative
            inline-flex
            h-full
            w-full
            items-center
            justify-center
            overflow-visible
            rounded-[2px]
          "
          >
            <img
              alt="test"
              :src="item.url"
              class="press-image__img
              absolute
              h-auto
              max-h-full
              w-auto
              max-w-full
              cursor-pointer
              "
            >
            <div
              class="press-image__hover
              absolute
              left-0
              top-0
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-[rgba(0,0,0,0.6)]
              leading-[22px]
              text-white
              opacity-0
              duration-200
              "
              @click.stop="onOpenPreview(open, index)"
            >
              <span
                class="px-[4px] py-[8px]"
                @click.stop="onOpenPreview(open, index)"
              >
                <BrowseIcon size="1.4em" />
                预览
              </span>
              <!-- <span class="mx-[0px]">|</span> -->
              <span
                class="px-[4px] py-[8px]"
                @click.stop="copyUrl(item)"
              >
                <FileCopyIcon size="1.4em" />
                复制
              </span>
            </div>
          </div>
        </template>
      </TImageViewer>
      <div
        class="
          mt-[8px]
          max-w-[160px]
          break-all
          text-center
          text-[14px]
          text-[#0052d9]
        "
        :class="{
          'line-clamp-2': shouldBreakWord,
          'truncate': !shouldBreakWord,
        }"
        :style="`max-width: ${width}`"
      >
        <TTooltip :content="item.name">
          {{ item.name }}
        </TTooltip>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { ref, computed } from 'vue';

import { clipboardWeb } from 't-comm/es/clipboard/clipboard-web';
import { BrowseIcon, FileCopyIcon } from 'tdesign-icons-vue-next';
import {
  ImageViewer as TImageViewer,
  Tooltip as TTooltip,
  MessagePlugin,
} from 'tdesign-vue-next';


import type { ParsedImage } from './types';

const previewIndex = ref(0);

type Props = {
  imageList: ParsedImage[];
  shouldBreakWord?: boolean;
  width?: string;
  height?: string;
}


const props = withDefaults(defineProps<Props>(), {
  imageList: () => ([]),
  shouldBreakWord: false,
  width: '160px',
  height: '160px',
});


const onOpenPreview = (open: (() => void), index: number) => {
  previewIndex.value = index;
  open();
};

const previewImgs = computed(() => props.imageList.map(item => item.url));

const copyUrl = (item: ParsedImage) => {
  clipboardWeb(item.url).then(() => {
    MessagePlugin.success('复制成功');
  });
};

defineOptions({
  name: 'ImageGrid',
});
</script>
