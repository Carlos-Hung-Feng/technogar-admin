import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    Purchase_Orders: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::purchase-order.purchase-order'
    >;
    Profile: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Description: Attribute.Text & Attribute.Required;
    Products: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::product.product'
    >;
    Active: Attribute.Boolean & Attribute.DefaultTo<true>;
    Customers: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::customer.customer'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCustomerCustomer extends Schema.CollectionType {
  collectionName: 'customers';
  info: {
    singularName: 'customer';
    pluralName: 'customers';
    displayName: 'Customer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    FullName: Attribute.String & Attribute.Required;
    Email: Attribute.Email;
    Telephone: Attribute.String & Attribute.Required;
    Address: Attribute.RichText & Attribute.Required;
    Product_Preferences: Attribute.Relation<
      'api::customer.customer',
      'manyToMany',
      'api::category.category'
    >;
    Payment_Method: Attribute.Relation<
      'api::customer.customer',
      'manyToOne',
      'api::payment-method.payment-method'
    >;
    NIF: Attribute.String;
    LastPurchaseDate: Attribute.Date;
    ProfilePicture: Attribute.Media;
    Note: Attribute.RichText;
    CustomerType: Attribute.Enumeration<['Wholesale', 'Retail']> &
      Attribute.Required &
      Attribute.DefaultTo<'Wholesale'>;
    Active: Attribute.Boolean & Attribute.DefaultTo<true>;
    Invoices: Attribute.Relation<
      'api::customer.customer',
      'oneToMany',
      'api::invoice.invoice'
    >;
    Links: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::customer.customer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvoiceInvoice extends Schema.CollectionType {
  collectionName: 'invoices';
  info: {
    singularName: 'invoice';
    pluralName: 'invoices';
    displayName: 'Invoice';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    InvoiceNumber: Attribute.Integer & Attribute.Unique;
    Subtotal: Attribute.Decimal & Attribute.Required;
    Tax: Attribute.Decimal;
    Total: Attribute.Decimal & Attribute.Required;
    Payment_Method: Attribute.Relation<
      'api::invoice.invoice',
      'manyToOne',
      'api::payment-method.payment-method'
    >;
    PaidWith: Attribute.Decimal & Attribute.Required;
    Returned: Attribute.Decimal & Attribute.Required;
    ReferenceNumber: Attribute.Integer;
    NIF: Attribute.Integer;
    Invoice_Discount: Attribute.Relation<
      'api::invoice.invoice',
      'manyToOne',
      'api::invoice-discount.invoice-discount'
    >;
    Customer: Attribute.Relation<
      'api::invoice.invoice',
      'manyToOne',
      'api::customer.customer'
    >;
    Invoice_Products: Attribute.Relation<
      'api::invoice.invoice',
      'oneToMany',
      'api::invoice-product.invoice-product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::invoice.invoice',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvoiceDiscountInvoiceDiscount
  extends Schema.CollectionType {
  collectionName: 'invoice_discounts';
  info: {
    singularName: 'invoice-discount';
    pluralName: 'invoice-discounts';
    displayName: 'Invoice_Discount';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    DiscountPercentage: Attribute.Integer &
      Attribute.Required &
      Attribute.Unique;
    Active: Attribute.Boolean & Attribute.DefaultTo<true>;
    Invoices: Attribute.Relation<
      'api::invoice-discount.invoice-discount',
      'oneToMany',
      'api::invoice.invoice'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::invoice-discount.invoice-discount',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::invoice-discount.invoice-discount',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInvoiceProductInvoiceProduct extends Schema.CollectionType {
  collectionName: 'invoice_products';
  info: {
    singularName: 'invoice-product';
    pluralName: 'invoice-products';
    displayName: 'Invoice_Product';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Invoice: Attribute.Relation<
      'api::invoice-product.invoice-product',
      'manyToOne',
      'api::invoice.invoice'
    >;
    Product: Attribute.Relation<
      'api::invoice-product.invoice-product',
      'manyToOne',
      'api::product.product'
    >;
    Quantity: Attribute.Integer & Attribute.Required;
    Price: Attribute.Decimal & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::invoice-product.invoice-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::invoice-product.invoice-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPaymentMethodPaymentMethod extends Schema.CollectionType {
  collectionName: 'payment_methods';
  info: {
    singularName: 'payment-method';
    pluralName: 'payment-methods';
    displayName: 'Payment Method';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Purchase_Orders: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToMany',
      'api::purchase-order.purchase-order'
    >;
    Invoices: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToMany',
      'api::invoice.invoice'
    >;
    Customers: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToMany',
      'api::customer.customer'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Description: Attribute.Text;
    RetailPrice: Attribute.Decimal & Attribute.Required;
    MinimumQuantity: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<1>;
    Weight: Attribute.Decimal;
    Dimensions: Attribute.String & Attribute.DefaultTo<'0.00x0.00'>;
    Photos: Attribute.Media;
    Supplier: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::supplier.supplier'
    >;
    Active: Attribute.Boolean & Attribute.DefaultTo<true>;
    Category: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::category.category'
    >;
    Warehouse_Inventories: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::warehouse-inventory.warehouse-inventory'
    >;
    BarCode: Attribute.String & Attribute.Required & Attribute.Unique;
    PurchaseOrder_Products: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::purchase-order-product.purchase-order-product'
    >;
    Slug: Attribute.UID<'api::product.product', 'Name'>;
    WholesalePrice: Attribute.Decimal & Attribute.Required;
    Invoice_Products: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::invoice-product.invoice-product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPurchaseOrderPurchaseOrder extends Schema.CollectionType {
  collectionName: 'purchase_orders';
  info: {
    singularName: 'purchase-order';
    pluralName: 'purchase-orders';
    displayName: 'Purchase Order';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    OrderNumber: Attribute.String;
    Supplier: Attribute.Relation<
      'api::purchase-order.purchase-order',
      'manyToOne',
      'api::supplier.supplier'
    >;
    Telephone: Attribute.String;
    Warehouse: Attribute.Relation<
      'api::purchase-order.purchase-order',
      'manyToOne',
      'api::warehouse.warehouse'
    >;
    Ordered_By: Attribute.Relation<
      'api::purchase-order.purchase-order',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    OrderedDate: Attribute.Date & Attribute.Required;
    Received_By: Attribute.Relation<
      'api::purchase-order.purchase-order',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    ReceivedDate: Attribute.Date;
    Tax: Attribute.Decimal & Attribute.DefaultTo<0>;
    Freight: Attribute.Decimal & Attribute.DefaultTo<0>;
    Total: Attribute.Decimal & Attribute.Required;
    Payment_Method: Attribute.Relation<
      'api::purchase-order.purchase-order',
      'manyToOne',
      'api::payment-method.payment-method'
    >;
    Status: Attribute.Enumeration<
      ['Ordered', 'In process', 'Received', 'Canceled']
    > &
      Attribute.DefaultTo<'Ordered'>;
    Document: Attribute.Media;
    ShippingAddress: Attribute.RichText & Attribute.Required;
    Note: Attribute.RichText;
    PurchaseOrder_Products: Attribute.Relation<
      'api::purchase-order.purchase-order',
      'oneToMany',
      'api::purchase-order-product.purchase-order-product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::purchase-order.purchase-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::purchase-order.purchase-order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPurchaseOrderProductPurchaseOrderProduct
  extends Schema.CollectionType {
  collectionName: 'purchase_order_products';
  info: {
    singularName: 'purchase-order-product';
    pluralName: 'purchase-order-products';
    displayName: 'Purchase Order_Product';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Purchase_Order: Attribute.Relation<
      'api::purchase-order-product.purchase-order-product',
      'manyToOne',
      'api::purchase-order.purchase-order'
    >;
    Product: Attribute.Relation<
      'api::purchase-order-product.purchase-order-product',
      'manyToOne',
      'api::product.product'
    >;
    Quantity: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }> &
      Attribute.DefaultTo<1>;
    Price: Attribute.Decimal & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::purchase-order-product.purchase-order-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::purchase-order-product.purchase-order-product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiShipmentShipment extends Schema.CollectionType {
  collectionName: 'shipments';
  info: {
    singularName: 'shipment';
    pluralName: 'shipments';
    displayName: 'Shipment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Origin: Attribute.Enumeration<['China', 'United State']> &
      Attribute.Required;
    Destination: Attribute.Enumeration<['Dominican Republic']> &
      Attribute.Required;
    ModeOfTransportation: Attribute.Enumeration<['Air', 'Sea', 'Road']>;
    EstimatedArrivalDate: Attribute.Date & Attribute.Required;
    ActualArrivalDate: Attribute.Date & Attribute.Required;
    TrackingNumber: Attribute.String;
    ContainerID: Attribute.String;
    Weight: Attribute.Decimal;
    Volume: Attribute.String & Attribute.DefaultTo<'0.00x0.00'>;
    ShippingCost: Attribute.Decimal & Attribute.Required;
    Note: Attribute.String;
    Status: Attribute.Enumeration<
      ['Preparing', 'Arrived at Origin', 'In Transit', 'Delivered', 'Completed']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Preparing'>;
    ShippingCompany: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::shipment.shipment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::shipment.shipment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSupplierSupplier extends Schema.CollectionType {
  collectionName: 'suppliers';
  info: {
    singularName: 'supplier';
    pluralName: 'suppliers';
    displayName: 'Supplier';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Telephone: Attribute.String & Attribute.Required;
    Email: Attribute.Email;
    Address: Attribute.String;
    ContactPersonName: Attribute.String;
    QualityScore: Attribute.Enumeration<['Low', 'Medium', 'High']> &
      Attribute.Required &
      Attribute.DefaultTo<'Medium'>;
    URL: Attribute.String;
    EstimatedDeliveryDays: Attribute.Integer &
      Attribute.Required &
      Attribute.DefaultTo<1>;
    Note: Attribute.RichText;
    Products: Attribute.Relation<
      'api::supplier.supplier',
      'oneToMany',
      'api::product.product'
    >;
    Active: Attribute.Boolean & Attribute.DefaultTo<true>;
    Purchase_Orders: Attribute.Relation<
      'api::supplier.supplier',
      'oneToMany',
      'api::purchase-order.purchase-order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::supplier.supplier',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::supplier.supplier',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWarehouseWarehouse extends Schema.CollectionType {
  collectionName: 'warehouses';
  info: {
    singularName: 'warehouse';
    pluralName: 'warehouses';
    displayName: 'Warehouse';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    Address: Attribute.String & Attribute.Required;
    Active: Attribute.Boolean & Attribute.DefaultTo<true>;
    Warehouse_Inventories: Attribute.Relation<
      'api::warehouse.warehouse',
      'oneToMany',
      'api::warehouse-inventory.warehouse-inventory'
    >;
    Purchase_Orders: Attribute.Relation<
      'api::warehouse.warehouse',
      'oneToMany',
      'api::purchase-order.purchase-order'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::warehouse.warehouse',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::warehouse.warehouse',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWarehouseInventoryWarehouseInventory
  extends Schema.CollectionType {
  collectionName: 'warehouse_inventories';
  info: {
    singularName: 'warehouse-inventory';
    pluralName: 'warehouse-inventories';
    displayName: 'Warehouse Inventory';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Warehouse: Attribute.Relation<
      'api::warehouse-inventory.warehouse-inventory',
      'manyToOne',
      'api::warehouse.warehouse'
    >;
    Product: Attribute.Relation<
      'api::warehouse-inventory.warehouse-inventory',
      'manyToOne',
      'api::product.product'
    >;
    Quantity: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::warehouse-inventory.warehouse-inventory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::warehouse-inventory.warehouse-inventory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::category.category': ApiCategoryCategory;
      'api::customer.customer': ApiCustomerCustomer;
      'api::invoice.invoice': ApiInvoiceInvoice;
      'api::invoice-discount.invoice-discount': ApiInvoiceDiscountInvoiceDiscount;
      'api::invoice-product.invoice-product': ApiInvoiceProductInvoiceProduct;
      'api::payment-method.payment-method': ApiPaymentMethodPaymentMethod;
      'api::product.product': ApiProductProduct;
      'api::purchase-order.purchase-order': ApiPurchaseOrderPurchaseOrder;
      'api::purchase-order-product.purchase-order-product': ApiPurchaseOrderProductPurchaseOrderProduct;
      'api::shipment.shipment': ApiShipmentShipment;
      'api::supplier.supplier': ApiSupplierSupplier;
      'api::warehouse.warehouse': ApiWarehouseWarehouse;
      'api::warehouse-inventory.warehouse-inventory': ApiWarehouseInventoryWarehouseInventory;
    }
  }
}
