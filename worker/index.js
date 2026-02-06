/**
 * InnerAura Site Worker
 * Injects live stats from KV into HTML at the edge
 */

export default {
  async fetch(request, env) {
    // Fetch the static HTML from assets
    const response = await env.ASSETS.fetch(request);

    // Only process HTML responses
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      return response;
    }

    const html = await response.text();

    // Get stats from KV (or default to empty object)
    const stats = await getStats(env);

    // Replace tokens with live values
    const processed = replaceTokens(html, stats);

    // Return processed HTML with original headers
    return new Response(processed, {
      status: response.status,
      headers: {
        ...Object.fromEntries(response.headers),
        'Content-Type': 'text/html; charset=utf-8',
      }
    });
  }
};

/**
 * Fetch stats from KV storage
 * @param {Object} env - Worker environment bindings
 * @returns {Promise<Object>} Stats object or empty object on failure
 */
async function getStats(env) {
  try {
    if (!env.STATS_KV) {
      console.warn('STATS_KV binding not available');
      return {};
    }
    const data = await env.STATS_KV.get('hyperweave', 'json');
    return data || {};
  } catch (error) {
    console.error('Failed to fetch stats from KV:', error);
    return {};
  }
}

/**
 * Replace template tokens with stat values
 * Missing/null values display as em-dash (-)
 *
 * @param {string} html - HTML content with {{TOKEN}} placeholders
 * @param {Object} stats - Stats object from KV
 * @returns {string} HTML with tokens replaced
 */
function replaceTokens(html, stats) {
  // Format helper: returns value or em-dash for null/undefined
  const format = (val) => val ?? '-';

  // Format helper: converts number to "X.XK+" format or em-dash
  const formatK = (val) => {
    if (val == null) return '-';
    if (typeof val === 'number') {
      return `${(val / 1000).toFixed(1)}K+`;
    }
    return val;
  };

  // Format helper: adds commas and "+" suffix for large numbers
  const formatWithCommas = (val) => {
    if (val == null) return '-';
    if (typeof val === 'number') {
      return val.toLocaleString() + '+';
    }
    return val;
  };

  // Calculate configs from themes × motions if not provided
  const configs = stats.configs ?? (
    stats.themes && stats.motions
      ? stats.themes * stats.motions
      : null
  );

  return html
    // Full config count with commas (e.g., "825+")
    .replace(/\{\{CONFIGS\}\}/g, formatWithCommas(configs))
    // Short config count (e.g., "0.8K+")
    .replace(/\{\{CONFIGS_SHORT\}\}/g, formatK(configs))
    // Theme count (v7 architecture)
    .replace(/\{\{THEMES\}\}/g, format(stats.themes))
    // Motion presets count
    .replace(/\{\{MOTIONS\}\}/g, format(stats.motions))
    // JavaScript bytes (typically 0)
    .replace(/\{\{JS_BYTES\}\}/g, format(stats.js_bytes ?? 0));
}
