import type { CollectionConfig } from 'payload';
import {
  lexicalEditor,
  HeadingFeature,
  BlockquoteFeature,
  LinkFeature,
  UploadFeature,
  HorizontalRuleFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ChecklistFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  InlineCodeFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  BlocksFeature,
  CodeBlock,
} from '@payloadcms/richtext-lexical';

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (data?.title && !value) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            }
            return value;
          }
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Upload an image file for this blog post',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Or specify an image URL / local path (e.g. /assets/images/blog/... or https://...)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: [
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          BlockquoteFeature(),
          LinkFeature(),
          UploadFeature(),
          HorizontalRuleFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          ChecklistFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          InlineCodeFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          BlocksFeature({ blocks: [CodeBlock()] }),
        ],
      }),
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes',
      },
    },
    {
      name: 'topic',
      type: 'relationship',
      relationTo: 'topics',
      hasMany: false,
      admin: {
        position: 'sidebar',
        description: 'Primary topic for this article (e.g. AI Engineering, Front-End)',
      },
    },
    {
      name: 'category',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Legacy category field (kept for compatibility)',
      },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Plain string tags (e.g. AI Engineering, MCP, Claude)',
      },
    },
  ],
};
