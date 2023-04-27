/*
 * Public API Surface of translatol-shared-module
 */

/**
 * Components
 */
export { TranslationComponent } from './lib/components/translation/translation.component';
export { TranslationItemComponent } from './lib/components/translation-item/translation-item.component';
export { TranslationListComponent } from './lib/components/translation-list/translation-list.component';
export { TranslationNavigationComponent } from './lib/components/translation-navigation/translation-navigation.component';
export { TranslationsComponent } from './lib/components/translations/translations.component';
export { TranslationSearchComponent } from './lib/components/translation-search/translation-search.component';

/**
 * Pipes
 */
export { EndOfStringPipe } from './lib/pipes/end-of-string/end-of-string.pipe';

/**
 * Services
 */
export { TreeBuilderService, ITreeNode } from './lib/services/tree-builder/tree-builder.service';

/**
 * Models
 */
export { XLIFF_FILE_HANDLER, XLIFFFileHandlerInterface } from './lib/models/xliff-file.service.interface';
export { TEMPLATE_FILE_HANDLER, TemplateFileHandlerInterface } from './lib/models/template-file.service.interface.1';

/**
 * Module
 */
export { TranslatolSharedModule } from './lib/translatol-shared-module.module';
