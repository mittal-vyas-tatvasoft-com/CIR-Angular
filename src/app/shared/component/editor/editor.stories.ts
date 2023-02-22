import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { EditorComponent } from './editor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';

export default {
  title: 'Editor-Component',
  component: EditorComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, CKEditorModule],
    }),
  ],
} as Meta<EditorComponent>;

const Template: Story<EditorComponent> = (args: EditorComponent) => ({
  props: args,
  template: `<ckeditor [(ngModel)]="data"
  (blur)="onChange($event, type, id)"
  ngDefaultControl ></ckeditor>
  `,
});

export const Basic = Template.bind({});
Basic.args = {
  data: '',
  id: 1,
  type: 2,
};

export const WithData = Template.bind({});
WithData.args = {
  data: 'Hello world!<br> This is the testing text.',
  id: 1,
  type: 2,
};
