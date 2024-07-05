<template>
  <q-page class="row items-center justify-evenly">
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component> -->
    <div style="width: 100%">
      <div style="width: 50em">
        <p>Component</p>
        <QOGImage
          :template="ogTemplate"
          :templateProps="tempProps"
          :config="config"
        />
      </div>
      <br /><br />
      <div><q-separator color="black" /></div>
      <br /><br />
      <div>
        <p>Directive</p>
        <span
          v-q-og-image="{
            template: ogTemplate,
            templateProps: tempProps,
            config: config,
          }"
        ></span>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
/* const url =
  'https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-400-normal.ttf'; */
import ogTemplate from 'src/components/OgImage/ogTemplate.vue';
const tempProps = {
  imageUrl: 'https://picsum.photos/seed/picsum/1200/628',
  title: 'test',
  summary: 'test summary',
  authorName: 'test author',
  authorImage: 'https://picsum.photos/seed/picsum/200/300',
  badgeLabel: 'test badge',
  badgeColor: '#000000',
};
/* const response = fetch(url, {})
  .then((res) => res.arrayBuffer())
  .then((data) => {
    return data;
  }); */
const config = {
  height: 628,
  width: 1200,
  fonts: [
    {
      name: 'Roboto',
      url: 'https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-400-normal.ttf',
      weight: 400,
      style: 'normal',
    },
  ],
};
/* import { ref } from 'vue';
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';

defineOptions({
  name: 'IndexPage'
});

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'ct1'
  },
  {
    id: 2,
    content: 'ct2'
  },
  {
    id: 3,
    content: 'ct3'
  },
  {
    id: 4,
    content: 'ct4'
  },
  {
    id: 5,
    content: 'ct5'
  }
]);

const meta = ref<Meta>({
  totalCount: 1200
}); */
</script>
