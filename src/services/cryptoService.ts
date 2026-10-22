export class CryptoService {
  /**
   * Computes SHA-256 hash using the Web Crypto API
   */
  static async sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Computes Shannon Password Entropy in bits:
   * E = L * log2(R)
   */
  static calculateEntropy(password: string): { bits: number; poolSize: number; crackTime: string; strength: 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Quantum-Resistant' } {
    if (!password) {
      return { bits: 0, poolSize: 0, crackTime: '0 seconds', strength: 'Very Weak' };
    }

    let poolSize = 0;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSymbol = /[^a-zA-Z0-9]/.test(password);

    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasDigit) poolSize += 10;
    if (hasSymbol) poolSize += 33;

    if (poolSize === 0) poolSize = 1;

    const bits = password.length * Math.log2(poolSize);

    let crackTime = 'Instant (< 1 ms)';
    let strength: 'Very Weak' | 'Weak' | 'Moderate' | 'Strong' | 'Quantum-Resistant' = 'Very Weak';

    if (bits < 32) {
      crackTime = 'Instant (< 10 ms)';
      strength = 'Very Weak';
    } else if (bits < 45) {
      crackTime = 'Few seconds to minutes';
      strength = 'Weak';
    } else if (bits < 60) {
      crackTime = 'Few days to months';
      strength = 'Moderate';
    } else if (bits < 80) {
      crackTime = 'Several decades';
      strength = 'Strong';
    } else {
      crackTime = 'Thousands to millions of years';
      strength = 'Quantum-Resistant';
    }

    return {
      bits: Math.round(bits * 10) / 10,
      poolSize,
      crackTime,
      strength,
    };
  }

  /**
   * Parses URL components and highlights deception flags
   */
  static analyzeUrl(urlString: string): {
    protocol: string;
    hostname: string;
    pathname: string;
    isHttps: boolean;
    hasHomoglyphs: boolean;
    isRawIp: boolean;
    flags: string[];
  } {
    const flags: string[] = [];
    let protocol = '';
    let hostname = '';
    let pathname = '';
    let isHttps = false;
    let hasHomoglyphs = false;
    let isRawIp = false;

    try {
      const parsed = new URL(urlString.startsWith('http') ? urlString : `https://${urlString}`);
      protocol = parsed.protocol;
      hostname = parsed.hostname;
      pathname = parsed.pathname;
      isHttps = protocol === 'https:';

      if (!isHttps) {
        flags.push('Unencrypted plain HTTP protocol (traffic readable in transit)');
      }

      // Check if IP address
      isRawIp = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/.test(hostname);
      if (isRawIp) {
        flags.push('Direct raw IP address in URL instead of registered domain name');
      }

      // Check for non-ascii homoglyphs
      hasHomoglyphs = /[^\u0000-\u007F]/.test(hostname);
      if (hasHomoglyphs) {
        flags.push('Contains international/Cyrillic homoglyph characters mimicking Latin letters');
      }

      // Excessive subdomains
      const parts = hostname.split('.');
      if (parts.length > 3 && !isRawIp) {
        flags.push('High number of subdomains often used to disguise genuine domain authority');
      }
    } catch {
      flags.push('Malformed or unparseable URL string');
    }

    return {
      protocol,
      hostname,
      pathname,
      isHttps,
      hasHomoglyphs,
      isRawIp,
      flags,
    };
  }
}
