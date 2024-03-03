import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Theme
 */
interface Theme {
  name: string;
  displayName: string;
  isDefault?: boolean;
}

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss'
})
export class ThemePickerComponent implements OnInit {
  /**
   * Available themes
   */
  public readonly themes: Theme[] = [{
    name: 'deeppurple-amber',
    displayName: 'Deep Purple & Amber'
  }, {
    name: 'indigo-pink',
    displayName: 'Indigo & Pink'
  }, {
    name: 'pink-bluegrey',
    displayName: 'Pink & Blue-grey',
    isDefault: true
  }, {
    name: 'purple-green',
    displayName: 'Purple & Green'
  }];
  /**
   * Theme example SVG path
   */
  private readonly _themeExampleSVGPath = 'assets/icons/theme-example.svg'
  /**
   * Current theme name
   */
  public currentTheme!: string;

  constructor(_iconRegistry: MatIconRegistry, _sanitizer: DomSanitizer) {
    _iconRegistry.addSvgIcon('theme-example', _sanitizer.bypassSecurityTrustResourceUrl(this._themeExampleSVGPath));
  }

  public ngOnInit(): void {
    const linkElement = document.createElement('link');
    linkElement.id = 'theme-link';
    linkElement.rel = 'stylesheet';
    document.head.appendChild(linkElement);

    const defaultTheme = this.themes.find(t => t.isDefault);
    this.selectTheme(defaultTheme?.name);
  }

  /**
   * Select theme by name
   */
  public selectTheme(themeName?: string): void {
    this.currentTheme = this.themes.find(t => t.name === themeName)?.name ?? '';
    if (this.currentTheme) {
      const linkElement = document.getElementById('theme-link') as HTMLLinkElement;
      linkElement.href = `assets/themes/${this.currentTheme}.css`;
    }
  }
}
