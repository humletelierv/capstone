package maltechnology.com;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import okhttp3.OkHttpClient;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Configura el cliente HTTP para omitir la verificación SSL y hostname
    OkHttpClient client = TrustAllCertificates.getUnsafeOkHttpClient().build();

    // Si usas Capacitor HTTP Plugin, configura el cliente aquí
    // CapacitorHttpPlugin.setClient(client);  // Esto depende de tu versión de Capacitor
  }
}

