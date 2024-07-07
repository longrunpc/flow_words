package longrun.flowwords.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import longrun.flowwords.GPT.GPTServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MemoServiceImpl implements MemoService {

    private final GPTServiceImpl gptService;

    @Autowired
    public MemoServiceImpl(GPTServiceImpl gptService) {
        this.gptService = gptService;
    }

    @Override
    public String memoRecommend(String memo) {
        try {
            return gptService.getAssistantMsg(memo+" 이문장을 정돈해서 다시써줘").getBody().toString();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Error processing the request";
        }
    }
}

