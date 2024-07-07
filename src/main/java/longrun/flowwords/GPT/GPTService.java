package longrun.flowwords.GPT;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.ResponseEntity;

public interface GPTService {
    ResponseEntity<?> getAssistantMsg(String userMsg) throws JsonProcessingException;
}
