package maltechnology.com;

import java.security.cert.X509Certificate;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import okhttp3.OkHttpClient;

public class TrustAllCertificates {
  public static OkHttpClient.Builder getUnsafeOkHttpClient() {
    try {
      final TrustManager[] trustAllCerts = new TrustManager[]{
        new X509TrustManager() {
          @Override
          public void checkClientTrusted(X509Certificate[] chain, String authType) {}
          @Override
          public void checkServerTrusted(X509Certificate[] chain, String authType) {}
          @Override
          public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
        }
      };

      final SSLContext sslContext = SSLContext.getInstance("SSL");
      sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

      HostnameVerifier hostnameVerifier = new HostnameVerifier() {
        @Override
        public boolean verify(String hostname, SSLSession session) {
          // Permitir todas las conexiones independientemente del hostname
          return true;
        }
      };

      OkHttpClient.Builder builder = new OkHttpClient.Builder();
      builder.sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCerts[0]);
      builder.hostnameVerifier(hostnameVerifier);
      return builder;
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }
}

