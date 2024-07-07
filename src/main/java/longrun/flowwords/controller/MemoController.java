package longrun.flowwords.controller;

import longrun.flowwords.service.Memo;
import longrun.flowwords.service.MemoServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MemoController {

    private final MemoServiceImpl memoService;

    public MemoController(MemoServiceImpl memoService) {
        this.memoService = memoService;
        System.out.println("memoService = " + memoService);;
    }

    @PostMapping("/send")
    public String memoReceive(@RequestBody Memo memo){
        String message = memo.getMessage();
        System.out.println(memoService.memoRecommend(message));
        return memoService.memoRecommend(message);
    }


}
