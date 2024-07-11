package longrun.flowwords.member;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Getter
@Entity(name = "MEMBER")
public class Member {

    @Id
    private String id;
    private String password;
    private MemberAuthority authority;

    @Builder
    public Member(String id, String password, MemberAuthority authority) {
        this.id = id;
        this.password = password;
        this.authority = authority;
    }
}
