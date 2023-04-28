/*
 * Public API Surface of translatol-shared-module
 */

/**
 * Components
 */
export { CopyToClipboardComponent } from './lib/components/copy-to-clipboard/copy-to-clipboard.component';
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
export { XLIFF_WRITING_SERVICE, XLIFFWritingInterface } from './lib/models/xliff-file.service.interface';
export { ResolvedXLIFF, XliffResolverService, xliffResolver } from './lib/services/xliff-resolver/xliff-resolver.service';
export { XLIFF_RESOLVER_SERVICE } from './lib/services/xliff-resolver/xliff-resolver.service';

/**
 * Module
 */
export { TranslatolSharedModule } from './lib/translatol-shared-module.module';
