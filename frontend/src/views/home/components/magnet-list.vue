<template>
  <ul class="list">
    <li class="list-item" v-for="(item, index) in list" :key="index">
      <div class="list-item-header">
        <h4 class="movie-title">{{ item.title }}</h4>
        <div class="movie-info">
          <time>
            <v-icon class="icon-time" name="calendar"/>
            {{ item.created | formatDate }}
          </time>
        </div>
      </div>
      <div class="list-item-body">
        <textarea class="magnet-content" rows="4" v-model="item.magnet"></textarea>
        <a class="copy-btn" :href="item.url" @click="copy(item.magnet)">
          <v-icon class="icon-magnet" name="magnet"/>复制
        </a>
      </div>
    </li>
  </ul>
</template>

<script>
import { formatDate } from "@/utils/time";

export default {
  name: "List",
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  filters: {
    formatDate
  },
  data() {
    return {};
  },
  methods: {
    copy(magnet) {
      this.$copyText(magnet);
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  overflow: hidden;
  position: relative;
  margin: 0 auto;

  &-item {
    margin: 20px;

    &-header {
      padding: 20px;
      border-radius: 8px 8px 0 0;
      background: radial-gradient(
            circle at bottom left,
            transparent 5px,
            rgba(#fff, 0.4) 0
          )
          bottom left,
        radial-gradient(
            circle at bottom right,
            transparent 5px,
            rgba(#fff, 0.4) 0
          )
          bottom right;
      background-size: 50% 100%;
      background-repeat: no-repeat;

      .movie-info {
        padding: 20px 10px 0;

        time {
          color: #444;
        }

        .icon-time {
          margin-right: 5px;
        }
      }
    }

    &-body {
      display: flex;
      align-items: center;
      position: relative;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      background: radial-gradient(
            circle at top left,
            transparent 5px,
            rgba(#fff, 0.4) 0
          )
          top left,
        radial-gradient(circle at top right, transparent 5px, rgba(#fff, 0.4) 0)
          top right;
      background-size: 50% 100%;
      background-repeat: no-repeat;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 10px;
        right: 10px;
        height: 1px;
        background: linear-gradient(
          to right,
          rgba(#fff, 0.2),
          rgba(#fff, 0.2) 2px,
          transparent 2px,
          transparent
        );
        background-size: 4px 100%;
      }

      .magnet-content {
        flex: 1;
        margin: 0 10px;
        padding: 0.5em 1em;
        font-size: 14px;
        line-height: 1.5;
        border-radius: 4px;
        color: #444;
        background-color: rgba(#fff, 0.1);
        word-break: break-all;
        resize: none;
      }

      .copy-btn {
        $h: 28px;

        padding: 0 20px;
        height: $h;
        line-height: $h;
        border-radius: $h / 2;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        color: #3785f7;
        background: rgba(#fff, 0.4);

        &:hover {
          cursor: pointer;
          user-select: none;
          background: rgba(#fff, 0.8);
        }

        .icon-magnet {
          font-size: 18px;
          font-weight: 500;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
