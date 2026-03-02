/**
 * Expo Config Plugin – Android Kiosk / Launcher Mode
 *
 * What this plugin does:
 *  1. Adds the HOME + DEFAULT categories to the MAIN intent-filter so the app
 *     can be selected as the default home screen launcher.
 *  2. Adds permissions required for kiosk operation:
 *       - REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
 *       - REORDER_TASKS
 *       - DISABLE_KEYGUARD
 *  3. Keeps FLAG_KEEP_SCREEN_ON and lock-task logic already present in
 *     MainActivity.kt (those changes live in the native file, not here).
 *
 * This plugin is idempotent – running `expo prebuild` multiple times will not
 * duplicate the entries.
 */

const { withAndroidManifest } = require('@expo/config-plugins');

/**
 * Ensures a permission element exists in the manifest.
 * @param {object[]} permissions  The manifest's <uses-permission> array.
 * @param {string}   name         The android:name value (short or fully qualified).
 */
function ensurePermission(permissions, name) {
    const fullName = name.startsWith('android.permission.') ? name : `android.permission.${name}`;
    const exists = permissions.some(p => p.$?.['android:name'] === fullName);
    if (!exists) {
        permissions.push({ $: { 'android:name': fullName } });
    }
}

/**
 * Ensures a category element exists inside an intent-filter.
 * @param {object[]} categories  The intent-filter's <category> array.
 * @param {string}   name        The android:name value.
 */
function ensureCategory(categories, name) {
    const exists = categories.some(c => c.$?.['android:name'] === name);
    if (!exists) {
        categories.push({ $: { 'android:name': name } });
    }
}

const withKioskMode = config =>
    withAndroidManifest(config, modConfig => {
        const manifest = modConfig.modResults;

        // ── 1. Permissions ────────────────────────────────────────────────────────
        if (!manifest.manifest['uses-permission']) {
            manifest.manifest['uses-permission'] = [];
        }
        const permissions = manifest.manifest['uses-permission'];
        ensurePermission(permissions, 'android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS');
        ensurePermission(permissions, 'android.permission.REORDER_TASKS');
        ensurePermission(permissions, 'android.permission.DISABLE_KEYGUARD');

        // ── 2. HOME / DEFAULT categories in the MAIN intent-filter ───────────────
        const application = manifest.manifest.application?.[0];
        if (!application) return modConfig;

        const activities = application.activity ?? [];
        for (const activity of activities) {
            const intentFilters = activity['intent-filter'] ?? [];
            for (const filter of intentFilters) {
                const actions = filter.action ?? [];
                const isMainAction = actions.some(a => a.$?.['android:name'] === 'android.intent.action.MAIN');
                if (!isMainAction) continue;

                // This is the MAIN intent-filter – add HOME and DEFAULT categories.
                if (!filter.category) filter.category = [];
                ensureCategory(filter.category, 'android.intent.category.HOME');
                ensureCategory(filter.category, 'android.intent.category.DEFAULT');
            }
        }

        return modConfig;
    });

module.exports = withKioskMode;
