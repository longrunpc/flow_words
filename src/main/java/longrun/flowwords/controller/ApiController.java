package longrun.flowwords.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {
    @GetMapping("/api/data")
    public String test() {
        return "박 찬";
    }
}