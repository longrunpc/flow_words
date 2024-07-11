package longrun.flowwords;

import longrun.flowwords.config.AppConfig;
import longrun.flowwords.member.Member;
import longrun.flowwords.member.MemberService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class MemberApp {
    public static void main(String[] args) {

        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);
        MemberService memberService = applicationContext.getBean("memberService", MemberService.class);

        Member member = new Member("pcjmo4050", "memberA", MemberAuthority.VIP);
        memberService.join(member);

        Member findMember = memberService.findMember("pcjmo4050");
        System.out.println("new member = "+member.getId());
        System.out.println("find Member = "+findMember.getId());

    }
}
